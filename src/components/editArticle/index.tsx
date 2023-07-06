import Footer from '../common/Footer';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { userAtom } from '@src/states/UserAtom';
import { useRecoilValue } from 'recoil';
import useInput from '@src/hooks/useInput';
import { useQuery } from 'react-query';
import { getArticleDetail, putArticleDetail } from '@src/apis/articles';
import { ArticleRequest, PutArticleReq } from '@src/types/articles';

export default function EditArticle() {
  const { id } = useParams(); //slug
  const { data } = useQuery(['articleDetail', id as string], () => getArticleDetail(id as string));
  const navigate = useNavigate();
  const userData = useRecoilValue(userAtom);
  const [title, onTitleChange] = useInput(data?.title);
  const [about, onAboutChange] = useInput(data?.description);
  const [text, setText] = useState<string>(data?.body as string);
  const [tag, setTag] = useState<string>();
  const [taglist, setTaglist] = useState(data?.tagList);

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
      taglist?.find((item) => {
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
    const req: PutArticleReq = {
      article: data,
    };
    const response = putArticleDetail(userData?.token as string, id as string, req);

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
                      value={title}
                      onChange={onTitleChange}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input type="text" className="form-control" value={about} onChange={onAboutChange} />
                  </fieldset>
                  <fieldset className="form-group">
                    <textarea className="form-control" rows={8} value={text} onChange={onHandleArticle} />
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
