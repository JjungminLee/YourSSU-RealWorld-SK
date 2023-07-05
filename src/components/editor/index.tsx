import { postArticle } from '@src/apis/articles';
import Footer from '../common/Footer';
import useInput from '@src/hooks/useInput';
import { ArticleRequest, PostArticleReq } from '@src/types/articles';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userAtom } from '@src/states/UserAtom';
import { useNavigate } from 'react-router';

export default function Editor() {
  const navigate = useNavigate();
  const userData = useRecoilValue(userAtom);
  const [title, onTitleChange] = useInput();
  const [about, onAboutChange] = useInput();
  const [text, setText] = useState<string>();
  const [tag, setTag] = useState<string>();
  const [taglist, setTaglist] = useState<string[]>([]);

  const onHandleArticle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const onTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTag(e.currentTarget.value);
  };
  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      console.log(tag);
      let canAdd: boolean = true;
      taglist.find((item) => {
        if (item === tag) {
          canAdd = false;
        }
      });
      if (canAdd) {
        setTaglist([...(taglist as string[]), tag as string]);
      }
      setTag('');
    }
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    const data: ArticleRequest = {
      title: title,
      description: about,
      body: text as string,
      tagList: taglist as string[],
    };
    const req: PostArticleReq = {
      article: data,
    };
    const response = postArticle(userData?.token, req);

    response
      .then(() => navigate('/'))
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div className="editor-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">
              <form onSubmit={onSubmit}>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Article Title"
                      value={title}
                      onChange={onTitleChange}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="What's this article about?"
                      value={about}
                      onChange={onAboutChange}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <textarea
                      className="form-control"
                      rows={8}
                      placeholder="Write your article (in markdown)"
                      onChange={onHandleArticle}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter tags"
                      value={tag}
                      onChange={onTagChange}
                      onKeyPress={onKeyPress}
                    />
                  </fieldset>
                  <div className="tag-list">
                    {taglist?.map((item) => (
                      <span className="tag-default tag-pill ng-binding ng-scope">
                        <i className="ion-close-round" />
                        {item}
                      </span>
                    ))}
                  </div>

                  <button onClick={onSubmit} className="btn btn-lg pull-xs-right btn-primary" type="button">
                    Publish Article
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
