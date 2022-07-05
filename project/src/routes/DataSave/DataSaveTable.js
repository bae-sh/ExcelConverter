import DataSaveHeader from './DataSaveHeader';
import DataSaveRow from './DataSaveRow';
import { Table } from './style';

const dataRows = ({ hscodes, setHscodes }) => {
  const rows = [];

  for (let index = 0; index < 20; index++) {
    rows.push(<DataSaveRow index={index} hscodes={hscodes} setHscodes={setHscodes} key={index} />);
  }
  return rows;
};

function DataSaveTable({ hscodes, setHscodes }) {
  return (
    <Table>
      <thead>
        <DataSaveHeader />
      </thead>
      <tbody>{dataRows({ hscodes, setHscodes })}</tbody>
    </Table>
  );
}

export default DataSaveTable;
