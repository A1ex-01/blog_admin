import FoldBox from '@/components/FoldBox';
import { BlogSite } from '@/constants';
import {
  addPost,
  getBlogs,
  syncBlogs,
  updatePostByUuid,
} from '@/services/blog';
import useCommonStore from '@/store/useCommonStore';
import { ExtendedProColumns, ICP, IPost } from '@/types';
import { handleAdd, handleUpdate } from '@/utils/apiAction';
import { EditFilled } from '@ant-design/icons';
import { ActionType, ProTable } from '@ant-design/pro-components';
import { Button, Flex, Tag } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import ActionModalForm from './components/ActionModalForm';
const TableList: React.FC<unknown> = () => {
  const actionRef = useRef<ActionType>();
  const columns: ExtendedProColumns<IPost>[] = [
    {
      title: '名称',
      dataIndex: ['notionDetail', 'title'],
    },
    {
      title: '内容',
      dataIndex: ['notionDetail', 'content'],
      width: 300,
      render(_) {
        return <FoldBox rows={4}>{_}</FoldBox>;
      },
    },
    {
      title: '分类',
      dataIndex: ['notionDetail', 'category'],

      render(data, record) {
        if (!record?.notionDetail?.category?.id) return null;
        return <Tag color="cyan">{record?.notionDetail?.category?.name}</Tag>;
      },
    },
    {
      title: '标签',
      dataIndex: ['notionDetail', 'tags'],
      render(data, record) {
        return (
          <Flex>
            {record?.notionDetail?.tags?.map((item) => (
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
      fixed: 'right',
      width: 130,
      render: (_, record) => (
        <div className="flex items-center gap-4">
          <a
            rel="noreferrer"
            className="text-primary"
            target="_blank"
            href={`${BlogSite}/post/${record?.notion_page_id}`}
          >
            链接
          </a>
          <ActionModalForm
            title="编辑"
            formVals={record}
            onSubmit={async (formVals) => {
              const res = await handleUpdate(
                updatePostByUuid(record.id, formVals),
              );
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
  const [syncing, setSyncing] = useState(false);
  return (
    <>
      <ProTable
        headerTitle="博客列表"
        actionRef={actionRef}
        search={false}
        toolBarRender={() => [
          <Button
            loading={syncing}
            type="link"
            key={'syncBlog'}
            onClick={async () => {
              setSyncing(true);
              const res = await handleUpdate(syncBlogs());
              setSyncing(false);
              if (res.success) {
                actionRef.current?.reload();
              }
            }}
          >
            同步所有notion博客到DB
          </Button>,
          <ActionModalForm
            title="新建"
            key="add"
            formVals={{}}
            trigger={<Button type="primary">新建</Button>}
            onSubmit={async (formVals) => {
              const res = await handleAdd(addPost(formVals));
              if (res.success) {
                actionRef.current?.reload();
              }
              return res.success;
            }}
          />,
        ]}
        pagination={{
          pageSize: 10,
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
        scroll={{
          x: 1400,
        }}
      />
      <Toaster />
    </>
  );
};

export default TableList;
