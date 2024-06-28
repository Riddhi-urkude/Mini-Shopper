import React, { useEffect, useState } from 'react'
import { getAllOrders } from '../../Services/Order.Service';
import { toast } from 'react-toastify';
import { Loader } from '../../Components/Loader';
import { SingleOrderView } from '../../Components/Users/SingleOrderView';

const ViewOrders = () => {
    const [ orders, setOrders] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getAllOrders();
                setOrders(data);
                setLoading(false);
            } catch (error) {
                toast.error("Failed to load orders");
            }
        };

        fetchOrders();
    }, []);

  return (
    <div>
      <Container classname="mt-3">
        <Row>
            <Col>
                <h3>All Orders (Shopper View)</h3>
                <hr />
            </Col>
        </Row>

        { loading ? (
            <Loader show={loading} />
        ) : (
           <>
            {orders.length === 0 ? (
                <h4 className="text-center">No orders found</h4>
            ) : (
                orders.map((order, index) => (
                    <SingleOrderView order={order} key={index} />
                ))    
            )}
           </>     
        )}
      </Container>
    </div>
  );
};

export default ViewOrders
