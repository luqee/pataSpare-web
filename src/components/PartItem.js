import {Card } from 'react-bootstrap'
import {urls} from '@/config/urls'
import Link from 'next/link';
import PartButton from './PartButton';

export const PartItem = ({part})=>{

    return (
        <Card style={{ 
            width: '85%',
            borderBottom: '3px solid #007bff',
        }}>
            <Link style={{
                textDecoration: 'none',
                color: 'inherit'
            }} href={`/parts/${part.id}`}>
            <Card.Img variant="top" src={`${urls.apiHost}/${part.part_image}`} width={250} height={250}/>
            <Card.Body>
                <Card.Title>{part.title}</Card.Title>
                <Card.Text>
                Price: {part.price}
                </Card.Text>
                <PartButton partId={part.id} qty={1}/>
            </Card.Body>
            </Link>
        </Card>
    );
}
