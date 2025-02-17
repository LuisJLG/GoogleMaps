import { URL } from "../../Const/Const";
export const getPublishableKey = async (token: string) => {
    try {
        const response = await fetch(`${URL}publishable-key`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                token: token
            },
        });
        const data = await response.json();
        return data ? data.publishableKey : "";
    } catch (error) {
        console.log('Error getting publishable key:', error);
        return "";
    }
}
export const updatePaymentDate = async (businessId: string, token: string, plan: string) => {
    try {

        const response = await fetch(`${URL}update-plan`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                token: token
            },
            body: JSON.stringify({
                id: businessId,
                plan: plan
            })
        });
        const data = await response.json();
        if (data) {
            console.log('Payment date updated successfully');
            return true;
        }
    } catch (error) {
        console.log('Error updating payment date:', error);
        return false;
    }

}