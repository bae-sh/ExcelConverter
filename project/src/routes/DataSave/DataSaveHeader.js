import { Row } from './style';

function DataSaveHeader() {
  const TABLE_HEADER_NAME = [
    '사진',
    '제품이름',
    '영어이름',
    '중국어이름',
    '운송장번호',
    '재질',
    '수량',
    '개당단가',
    '사이즈',
    'HS코드',
    '특이사항',
    '종류',
  ];
  return (
    <Row>
      <th width={50}>넘버</th>
      {TABLE_HEADER_NAME.map(name => (
        <th key={name}>{name}</th>
      ))}
    </Row>
  );
}

export default DataSaveHeader;
