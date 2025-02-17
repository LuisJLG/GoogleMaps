import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Check from '../../../assets/SVG/Check';
import { MoreIcon } from '../../../assets/SVG/MoreIcon';
import { PaymentScreen } from '../../Sales/Cart/PaymentScreen';
import { PaymentScreenStripe } from './PaymentScreenStripe';
import { ThemeLight } from '../../Theme/Theme';
import { AppContext } from '../../Context/AppContext';

const context = useContext(AppContext);
const plans = [
    {
        name: 'Plan Emprendedor',
        benefits: [
            'Impresión de Tickets',
            '7,000 transacciones por mes',
            '1 usuario',
            'Soporte 24/7',
            'Reportes diarios',
            'Hasta 200 productos'
        ],
        color: '#4267B2', // Facebook blue color for Plan Emprendedor
        key: '1',
    },
    {
        name: 'Plan Empresarial',
        benefits: [
            'Impresión de Tickets',
            '25,000 transacciones por mes',
            '7 usuarios',
            'Soporte 24/7',
            'Reportes diarios',
            'Gestión de inventarios',
            'Gestión de empleados',
            'Hasta 1500 imagenes',
            'Actualizaciones automáticas',
            'Soporte técnico prioritario',
        ],
        color: '#4a90e2', // Solid color for Plan Empresarial
        key: '2',
    },
    {
        name: 'Plan VIP',
        benefits: [
            'Ajusta tu plan a tus necesidades',
            'Soporte personalizado',
            'Reportes personalizados',
            'Soporte 24/7',
        ],
        color: '#000', // Solid color for Plan VIP
        key: '3',
    },
];

export const SelectPlan: React.FC = ({ navigation }: any) => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
          
            <Text style={styles.header}>Selecciona tu Plan</Text>
            {plans.map((plan, index) => (
                <View key={index} style={[styles.card, { backgroundColor: plan.color }]}>
                    <Text style={styles.planName}>{plan.name}</Text>
                    {plan.benefits.map((benefit, idx) => (
                        <View key={idx} style={styles.benefitContainer}>
                            <Check height={20} width={20} />
                            <Text style={styles.benefit}>{benefit}</Text>
                        </View>
                    ))}
                    {
                        plan.name === 'Plan VIP' ? (
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {
                                    // Logic to handle contacting support
                                    //abrir whatsapp
                                    Linking.openURL('https://wa.me/524451074136?text=Hola,%20necesito%20ayuda%20con%20mi%20cuenta%20de%20VIP%20en%20la%20aplicación%20de%20Punto%20de%20Venta')
                                }}
                            >
                                <Text style={styles.buttonText}>Contactar Soporte</Text>
                            </TouchableOpacity>
                        )
                        :
                    <PaymentScreenStripe navigation={navigation} plan={plan.name.toUpperCase()} />
                    }
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        marginTop: 35,
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    card: {
        borderRadius: 15,
        padding: 25,
        marginBottom: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 6,
        elevation: 8,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    planName: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#fff',
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 4,
    },
    benefitContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    benefit: {
        fontSize: 18,
        color: '#fff',
        marginLeft: 12,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 4,
    },
    button: {
        marginTop: 25,
        backgroundColor: 'transparent',
        paddingVertical: 12,
        borderRadius: 25,
        alignItems: 'center',
        elevation: 1,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
});
