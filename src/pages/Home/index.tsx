import Guide from '@/components/Guide';
import useUserStore from '@/store/useUserStore';
import { PageContainer } from '@ant-design/pro-components';
import styles from './index.less';

const HomePage: React.FC = () => {
  const { user } = useUserStore();
  return (
    <PageContainer ghost>
      <div className={styles.container}>
        <Guide name={user?.nickname as string} />
      </div>
    </PageContainer>
  );
};

export default HomePage;
