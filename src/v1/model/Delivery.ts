/* eslint-disable camelcase */
import { Model } from "objection";
import VEHICLETYPE from "@v1/enum/vehicleType";
import PAYMENTMETHOD from "@v1/enum/paymentType";

export default class Delivery extends Model {
    // Table name is the only required property.
    static tableName = "deliveries";

    id!: number;
    user_id!: string;
    rider_id!: string;
    from!: string;
    to!: string;
    phone: string | undefined;
    vehicle_type!: VEHICLETYPE;
    pickup_time!: string;
    is_scheduled!: boolean;
    description!: string;
    bill!: number;

    payment_method!: PAYMENTMETHOD;
    delivery_state?: DELIVERYSTATE;

    deliveryData() {
        return {
            id: this.id,
            user_id: this.user_id,
            rider_id: this.rider_id,
            from: this.from,
            to: this.to,
            phone: this.phone,
            vehicle_type: this.vehicle_type,
            pickup_time: this.pickup_time,
            is_scheduled: this.is_scheduled,
            description: this.description,
            bill: this.bill,
            payment_method: this.payment_method,
            delivery_state: this.delivery_state
        };
    }
}
