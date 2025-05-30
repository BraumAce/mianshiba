import { Input } from "antd";
import { useRouter } from "next/navigation";

/**
 * 搜索条
 * @constructor
 */
const SearchInput = () => {
  const router = useRouter();

  return (
    <div
      className="search-input"
      key="SearchOutlined"
      aria-hidden
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Input.Search
        style={{
          borderRadius: 4,
        }}
        placeholder="搜索题目"
        onSearch={(value) => {
          router.push(`/questions?q=${value}`);
        }}
      />
    </div>
  );
};

export default SearchInput;