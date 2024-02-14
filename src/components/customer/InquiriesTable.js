import {Table} from 'react-bootstrap'
import { InquiryRow } from '@/components/customer/InquiryRow'

export const InquiriesTable = ({inquiries})=>{

    return (
        inquiries.length > 0 ?
        <Table>
            <thead>
            <tr>
            <th>Query</th>
            <th>Product</th>
            <th>Store</th>
            <th>Replies</th>
            <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {
                inquiries.length > 0 ?
                inquiries.map((inquiry, indx) => {
                    return <InquiryRow key={indx} inquiry={inquiry} />
                    })
                :
                !loading && <p>NO INQUIRIES</p>
            }
            </tbody>
        </Table>
        :
        <p>No Inquiries</p>
    )
}