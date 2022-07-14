function SortBox({ editable, inputChange, index, productList }) {
  const sortValue = productList[index]['sort'] ? productList[index]['sort'] : '전체';

  return editable ? (
    <select onChange={e => inputChange(e, index)} id="sort" defaultValue={sortValue}>
      <option value="전체">전체</option>
      <option value="더이브닝">더이브닝</option>
      <option value="삭제">삭제</option>
    </select>
  ) : (
    <div>{sortValue}</div>
  );
}

export default SortBox;
