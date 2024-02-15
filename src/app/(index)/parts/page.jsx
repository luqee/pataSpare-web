import { Suspense } from "react"
import PartsDisplay from '@/components/PartsDisplay'

const Parts = ()=> {
    
    return (
        <Suspense>
            <PartsDisplay />
        </Suspense>
    )
}

export default Parts