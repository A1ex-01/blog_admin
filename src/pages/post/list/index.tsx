import { BlogSite } from '@/constants';
import { getBlogs, updatePostByUuid } from '@/services/blog';
import useCommonStore from '@/store/useCommonStore';
import { ICP, IPost } from '@/types';
import { handleUpdate } from '@/utils/apiAction';
import { EditFilled } from '@ant-design/icons';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, Flex, Tag } from 'antd';
import React, { useEffect, useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import UpdateForm from './components/UpdateForm';
const TableList: React.FC<unknown> = () => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<IPost>[] = [
    {
      title: '名称',
      dataIndex: ['notion', 'title'],
    },
    {
      title: '分类',
      dataIndex: ['notion', 'category'],

      render(data, record) {
        if (!record?.notion?.category?.id) return null;
        return <Tag color="cyan">{record?.notion?.category?.name}</Tag>;
      },
    },
    {
      title: '标签',
      dataIndex: ['notion', 'tags'],
      render(data, record) {
        return (
          <Flex>
            {record?.notion?.tags?.map((item) => (
              <Tag key={item?.id}>{item?.name}</Tag>
            ))}
          </Flex>
        );
      },
    },
    {
      title: '发布时间',
      dataIndex: 'publishedAt',
      valueType: 'dateTime',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <div className="flex items-center gap-4">
          <a
            rel="noreferrer"
            className=""
            target="_blank"
            href={`${BlogSite}/post/${record?.notion_page_id}`}
          >
            链接
          </a>
          <UpdateForm
            title="编辑"
            formVals={record}
            onSubmit={async (formVals) => {
              const res = await handleUpdate(
                updatePostByUuid(record.id, formVals),
              );
              console.log('🚀 ~ onSubmit={async ~ res:', res);
              if (res.success) {
                actionRef.current?.reload();
              }
              return res.success;
            }}
            trigger={<Button type="link" icon={<EditFilled />} />}
          />
        </div>
      ),
    },
  ];
  const { getNotionPages } = useCommonStore();
  useEffect(() => {
    getNotionPages();
  }, []);
  return (
    <>
      <ProTable
        headerTitle="查询表格"
        actionRef={actionRef}
        search={false}
        toolBarRender={() => [
          <Button key="1" type="primary">
            新建
          </Button>,
        ]}
        pagination={{
          pageSize: 2,
        }}
        request={async (params: ICP) => {
          const toastId = toast.loading('获取列表中');
          const {
            success,
            data: { list, total },
          } = await getBlogs({
            ...params,
          });
          if (success) {
            toast.success('获取列表成功');
          }
          toast.dismiss(toastId);
          return {
            data: list || [],
            total,
            success,
            // total,
          };
        }}
        columns={columns}
      />
      <Toaster />
    </>
  );
};

export default TableList;
