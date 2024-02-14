import Link from 'next/link';
import { usePathname } from 'next/navigation'
import {Button} from 'react-bootstrap';

export const InquiryRow = ({inquiry})=>{
    const path = usePathname()
    let numOfReplies = 0
    if(inquiry.replies && inquiry.replies.length > 0){
        numOfReplies = inquiry.replies.length
    }
    
    return (
        <tr key={indx}>
            <td>{inquiry.query}</td>
            <td>{(inquiry.part === null) ? '-': inquiry.part.name}</td>
            <td>{(inquiry.shop === null) ? '-': inquiry.shop.name}</td>
            <td>{numOfReplies}</td>
            <td>
            <Link href={`${path}/${inquiry.id}`}>
            <Button>View</Button>
            </Link>
            </td>
        </tr>
    )
}
