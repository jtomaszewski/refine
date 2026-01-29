import { List, useTable } from "@refinedev/antd";
import { Table } from "antd";

import type { ICommit } from "../../interfaces";

export const PostList: React.FC = () => {
  const { tableProps } = useTable<ICommit>({
    pagination: {
      mode: "cursor",
      pageSize: 5,
    },
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} rowKey="sha">
        <Table.Column
          dataIndex="sha"
          title="SHA"
          width={100}
          render={(value: string) => value?.substring(0, 7)}
        />
        <Table.Column
          dataIndex={["commit", "message"]}
          title="Message"
          ellipsis
        />
        <Table.Column
          dataIndex={["commit", "author", "name"]}
          title="Author"
          width={150}
        />
        <Table.Column
          dataIndex={["commit", "author", "date"]}
          title="Date"
          width={200}
        />
      </Table>
    </List>
  );
};
