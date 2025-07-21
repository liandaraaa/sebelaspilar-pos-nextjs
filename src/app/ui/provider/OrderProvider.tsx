
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/lib/store";
import { fetchOrders } from "@/app/lib/features/ordersSlice";
import { setOrderCount } from "@/app/lib/features/pendingOrderCountSlice";

const OrderProvider = ({ children }: { children: React.ReactNode })=>{

  const {status:ordersStatusState, orders} = useSelector((state: RootState) => state.orders);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(()=>{
    if(ordersStatusState === 'idle'){
      console.log('cek provider order iddle, fetching..')
      dispatch(fetchOrders())
    }

    if(ordersStatusState === 'succeeded'){
      console.log('cek provider order success, send count..')
      dispatch(setOrderCount(orders.filter(order => order.statusOrder === 'Pending').length))
    }
  },[ordersStatusState,dispatch, orders])

  return(
    <div>
      {children}
    </div>
  )
}
export default OrderProvider;