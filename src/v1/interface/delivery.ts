import PAYMENTMETHOD from "@v1/enum/paymentType";
import VEHICLETYPE from "@v1/enum/vehicleType";

/* eslint-disable camelcase */
type DeliveryBody = {
    rider_id: string;
    from: string;
    to: string;
    vehicle_type: VEHICLETYPE;
    pickup_time?: string;
    is_scheduled: boolean;
    description: string;
    bill: number;
    payment_method: PAYMENTMETHOD;
    delivery_state: DELIVERYSTATE;
};

export default DeliveryBody;
