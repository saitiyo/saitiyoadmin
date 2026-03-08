import { Card } from 'antd'

interface DashboardCardProps {
    title?: string;
    content?: string | number;
}

const DashboardCard = ({title, content}:DashboardCardProps) => {

    return (
        <div>
            <Card
                title={<div style={{ fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center' }}>{title}</div>}
                style={{
                    height: '200px',
                    width: '280px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    textAlign: 'center',
                    padding: '16px',
                }}
                
            >
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#800000', marginTop: 'auto' }}>
                    {content}
                </div>
            </Card>
        </div>
    )
} 

export default DashboardCard
