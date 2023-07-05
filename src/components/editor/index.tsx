import React from 'react';
import Footer from '../common/Footer';
import useInput from '../../hooks/useInput';
import { useState } from 'react';

export default function Editor() {
  const [title, setTitle] = useInput('');
  const [about, setAbout] = useInput('');
  const [text, setText] = useInput('');
  const [tag, setTag] = useState([]);

  const onSubmit = () => {};
  return (
    <>
      <div className="editor-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">
              <form>
                <fieldset>
                  <fieldset className="form-group">
                    <input type="text" className="form-control form-control-lg" placeholder="Article Title" />
                  </fieldset>
                  <fieldset className="form-group">
                    <input type="text" className="form-control" placeholder="What's this article about?" />
                  </fieldset>
                  <fieldset className="form-group">
                    <textarea
                      className="form-control"
                      rows={8}
                      placeholder="Write your article (in markdown)"></textarea>
                  </fieldset>
                  <fieldset className="form-group">
                    <input type="text" className="form-control" placeholder="Enter tags" />
                    <div className="tag-list"></div>
                  </fieldset>
                  <button className="btn btn-lg pull-xs-right btn-primary" type="button">
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
