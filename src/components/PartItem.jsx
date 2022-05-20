import {useState, useContext, useEffect} from 'react';
import {Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import urls from '../config/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../App';
import { addToCart } from '../api/cart'

function PartItem({part}){
    let cartContext = useContext(CartContext)
    let [adding, setAdding] = useState(false)
    let [inCart, setInCart] = useState(0)
    useEffect(()=>{
        setInCart(countInCart())
    }, [])

    const addItem = () => {
        setAdding(true)
        let item_to_add  = {
            part_id: part.id,
            quantity: parseInt(1)
        }
        addToCart(item_to_add, cartContext.cart, (cart)=> {
            if(cart){
                setAdding(false)
                cartContext.updateCart(cart)
                setInCart(countInCart())
            }
        })
    }
    const countInCart = () => {
        let count = 0
        if(Object.keys(cartContext.cart).length > 0){
            cartContext.cart.items.forEach((item) => {
                if(item.part_id === parseInt(part.id)){
                    count = item.quantity
                }
            })
        }
        return count
    }
    return (
        <Card style={{ 
            width: '85%',
            borderBottom: '3px solid #007bff',
        }}>
            <Link to={`/parts/${part.id}`} state={{part: part}}>
                <Card.Img variant="top" src={`${urls.hostRoot}/${part.part_image}`} width={250} height={250}/>
            </Link>
            <Card.Body>
                <Card.Title>{part.title}</Card.Title>
                <Card.Text>
                Price: {part.price}
                </Card.Text>
                <Button size={'sm'} onClick={addItem}>
                <FontAwesomeIcon icon={faShoppingCart} /> {adding?'Adding...':'Add'}
                <br />
                {
                    (inCart === 0) ? null:
                    <span>{`(${inCart})`}</span>
                }
                </Button>
            </Card.Body>
        </Card>
    );

}

export default PartItem;
