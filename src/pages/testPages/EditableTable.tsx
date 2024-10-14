// This component implements an editable table using Ant Design components
// It allows users to view, edit, and save changes to a list of data

import React, { useState } from 'react';
import type { TableProps } from 'antd';
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';

// Define the structure of each data item
interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}

// Generate sample data
const originData = Array.from({ length: 100 }).map<DataType>((_, i) => ({
  key: i.toString(),
  name: `Edward ${i}`,
  age: 32,
  address: `London Park no. ${i}`,
}));

// Props for the EditableCell component
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: DataType;
  index: number;
}

// EditableCell component for rendering editable cells
const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

// Main App component
const EditableTable: React.FC = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState<DataType[]>(originData);
  const [editingKey, setEditingKey] = useState('');

  // Check if a record is currently being edited
  const isEditing = (record: DataType) => record.key === editingKey;

  // Start editing a record
  const edit = (record: Partial<DataType> & { key: React.Key }) => {
    form.setFieldsValue({ name: '', age: '', address: '', ...record });
    setEditingKey(record.key);
  };

  // Cancel editing
  const cancel = () => {
    setEditingKey('');
  };

  // Save changes to a record
  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as DataType;

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  // Define table columns
  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
      width: '25%',
      editable: true,
    },
    {
      title: 'age',
      dataIndex: 'age',
      width: '15%',
      editable: true,
    },
    {
      title: 'address',
      dataIndex: 'address',
      width: '40%',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_: any, record: DataType) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link onClick={() => save(record.key)} style={{ marginInlineEnd: 8 }}>
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        );
      },
    },
  ];

  // Merge editable cell properties into columns
  const mergedColumns: TableProps<DataType>['columns'] = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  // Render the editable table
  return (
    <Form form={form} component={false}>
      <Table<DataType>
        components={{
          body: { cell: EditableCell },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{ onChange: cancel }}
      />
    </Form>
  );
};

export default EditableTable;