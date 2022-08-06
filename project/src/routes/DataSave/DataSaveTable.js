import DataSaveHeader from './DataSaveHeader';
import DataSaveRow from './DataSaveRow';
import { Table } from './style';

const dataRows = ({ dataArr }) => {
  const rows = [];

  for (let index = 0; index < 20; index++) {
    rows.push(<DataSaveRow index={index} key={'data' + index} dataArr={dataArr} />);
  }
  return rows;
};

function DataSaveTable({ dataArr }) {
  return (
    <Table>
      <thead>
        <DataSaveHeader />
      </thead>
      <tbody>{dataRows({ dataArr })}</tbody>
    </Table>
  );
}

export default DataSaveTable;
