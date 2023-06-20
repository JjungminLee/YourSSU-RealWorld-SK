import { useGetTag } from '../../../hooks/useGetTag';

export default function PopularTag() {
  // 임의 데이터
  const { data: tags } = useGetTag({ path: 'tags' });

  return (
    <div className="col-md-3">
      <div className="sidebar">
        <p>Popular Tags</p>
        <div className="tag-list">
          {tags?.tags.map((item: []) => (
            <a href="" className="tag-pill tag-default">
              {item}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
