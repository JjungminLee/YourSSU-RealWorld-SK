import { tagState } from '@src/states/tagState';
import { TagResponse } from '@src/types/tag';
import { useSetRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

export default function PopularTag({ tag }: { tag: TagResponse | undefined }) {
  const setTag = useSetRecoilState(tagState);
  return (
    <div className="col-md-3">
      <div className="sidebar">
        <p>Popular Tags</p>
        <div className="tag-list">
          {tag ? (
            tag?.tags.map((item) => (
              <a
                href="#"
                className="tag-pill tag-default"
                onClick={() => {
                  setTag(item);
                }}
                key={uuidv4()}>
                {item}
              </a>
            ))
          ) : (
            <div>Loading Tags...</div>
          )}
        </div>
      </div>
    </div>
  );
}
