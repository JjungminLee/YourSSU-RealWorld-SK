import { TagResponse } from '@src/types/tag';

export default function PopularTag({ tag }: { tag: TagResponse | undefined }) {
  return (
    <div className="col-md-3">
      <div className="sidebar">
        <p>Popular Tags</p>
        <div className="tag-list">
          {tag?.tags.map((item: []) => (
            <a href="" className="tag-pill tag-default">
              {item}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
