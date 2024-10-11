import React, { useState } from 'react';
import {
  Button,
  Input,
  InputNumber,
  Popconfirm,
  Space,
  message,
  Typography,
} from 'antd';
import {
  DragSortTable,
  ProColumns,
  EditableProTable,
} from '@ant-design/pro-components';
import { PlusOutlined, MenuOutlined } from '@ant-design/icons';

interface TableItem {
  id: string;
  name: string;
  age: number;
  address: string;
  description: string;
}

const AdvancedTable: React.FC = () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<TableItem[]>([
    {
      id: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
      id: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Bridge Street',
      description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Bridge Street.',
    },
  ]);

  const columns: ProColumns<TableItem>[] = [
    {
      title: 'Sort',
      dataIndex: 'sort',
      width: 60,
      className: 'drag-visible',
      editable: false,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      width: 150,
      formItemProps: {
        rules: [{ required: true, message: 'Name is required' }],
      },
    },
    {
      title: 'Age',
      dataIndex: 'age',
      width: 100,
      formItemProps: {
        rules: [{ required: true, message: 'Age is required' }],
      },
      renderFormItem: () => <InputNumber min={1} max={120} />,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      formItemProps: {
        rules: [{ required: true, message: 'Address is required' }],
      },
    },
    {
      title: 'Action',
      valueType: 'option',
      width: 200,
      render: (_, record, __, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          Edit
        </a>,
        <Popconfirm
          key="delete"
          title="Are you sure to delete this record?"
          onConfirm={() => {
            setDataSource(dataSource.filter((item) => item.id !== record.id));
            message.success('Deleted successfully');
          }}
        >
          <a>Delete</a>
        </Popconfirm>,
      ],
    },
  ];

  const handleDragSortEnd = (beforeIndex: number, afterIndex: number, newDataSource: any) => {
    console.log('排序后的数据', newDataSource);
    setDataSource(newDataSource);
    message.success('修改列表排序成功');
  };

  return (
    <DragSortTable<TableItem>
      headerTitle="Advanced Editable Table"
      columns={columns}
      rowKey="id"
      dataSource={dataSource}
      onChange={setDataSource as any}
      dragSortKey="sort"
      onDragSortEnd={handleDragSortEnd}
      expandable={{
        expandedRowRender: (record) => (
          <Typography.Paragraph>{record.description}</Typography.Paragraph>
        ),
      }}
      editable={{
        type: 'multiple',
        editableKeys,
        onSave: async (rowKey, data, row) => {
          console.log(rowKey, data, row);
          // Here you would typically make an API call to save the data
          message.success('Saved successfully');
        },
        onChange: setEditableRowKeys,
      }}
      toolBarRender={() => [
        <Button
          type="primary"
          key="add"
          onClick={() => {
            const newId = (parseInt(dataSource[dataSource.length - 1]?.id || '0') + 1).toString();
            const newRow: TableItem = {
              id: newId,
              name: `New Person ${newId}`,
              age: 25,
              address: 'Click to edit',
              description: 'New person description',
            };
            setDataSource([...dataSource, newRow]);
            setEditableRowKeys([...editableKeys, newId]);
          }}
          icon={<PlusOutlined />}
        >
          Add New Row
        </Button>,
      ]}
    />
  );
};

export default AdvancedTable;