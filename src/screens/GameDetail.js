import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import customStyle from '../commons/CustomStyle';
import { editItem } from '../redux/actions';
import { useDispatch } from 'react-redux';

const GameDetail = ({ navigation, route }) => {

    const { params } = route;
    const item = params?.item;
    const [quantity, setQuantity] = useState(item.quantity ?? 0);
    const dispatch = useDispatch();

    const onPressTouchable = (action) => {
        const currentQuantity = quantity;
        let newQuantity;

        if (action === 'ADD') {
            newQuantity = currentQuantity + 1;
        } else if (action === 'SUBSTRACT') {
            newQuantity = Math.max(0, currentQuantity - 1);
        } else {
            newQuantity = currentQuantity || 1;
        }

        setQuantity(newQuantity);
        const updatedItem = { ...item, quantity: newQuantity };
        dispatch(editItem(updatedItem));
    };

    const disable = !(quantity > 0);

    return (
        <View style={{ flex: 1 }}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image
                    source={{ uri: item?.image }}
                    resizeMode={'contain'}
                    style={styles.image}
                />
            </View>
            <View style={styles.containerInner}>
                <Text style={styles.title}>{'Datos del juego'}</Text>
                <View style={styles.containerData}>
                    <View style={styles.dataField}>
                        <Text style={styles.textTitleFieldsForm}>{'Nombre'}</Text>
                        <Text
                            style={styles.textInfo}>{item?.name}</Text>
                    </View>
                    <View style={styles.dataField}>
                        <Text style={styles.textTitleFieldsForm}>{'Personaje'}</Text>
                        <Text
                            style={styles.textInfo}>{item?.character}</Text>
                    </View>
                    <View style={styles.dataField}>
                        <Text style={styles.textTitleFieldsForm}>{'Serie'}</Text>
                        <Text
                            style={styles.textInfo}>{item?.gameSeries}</Text>
                    </View>
                    <View style={styles.dataField}>
                        <Text style={styles.textTitleFieldsForm}>{'Amiibo Serie'}</Text>
                        <Text
                            style={styles.textInfo}>{item?.amiiboSeries}</Text>
                    </View>
                    <View style={styles.dataField}>
                        <Text style={styles.textTitleFieldsForm}>{'Cantidad'}</Text>
                        <Text
                            style={styles.textInfo}>{quantity} unidades</Text>
                    </View>
                </View>
                <View style={{ alignItems: 'center' }}>

                    <View style={styles.containerBotton}>
                        <TouchableOpacity disabled={disable} onPress={() => onPressTouchable('SUBSTRACT')}
                                          style={[styles.touchable, { backgroundColor: disable ? '#bbe0cf' : '#007b4f' }]}>
                            <Text style={styles.textTouchable}>
                             Eliminar item {'-1'}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onPressTouchable('ADD')} style={styles.touchable}>
                            <Text style={styles.textTouchable}>
                               Añadir item {'+1'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    containerInner: {
        paddingTop: 25,
        paddingHorizontal: 25,
        flex: 1,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginRight: 8,
    },
    title: {
        fontSize: customStyle.getFontSize(18),
        fontWeight: 'bold',
        color: customStyle.DarkGrey(),
        marginBottom: 20,
    },
    textTitleFieldsForm: {
        color: customStyle.getSubTitleTextColor(),
        fontSize: customStyle.getFontSize(16),
        flex: 1,
    },
    textInfo: {
        color: customStyle.getTitleTextColor(),
        fontWeight: 'bold',
        fontSize: customStyle.getFontSize(16),
        flex: 1,
    },
    containerData: {
        backgroundColor: customStyle.White(),
        borderRadius: 5,
        marginBottom: 15,
    },
    dataField: {
        flexDirection: 'row',
        padding: 15,
        borderBottomColor: customStyle.ContentBackground(),
        borderBottomWidth: 1,
    },
    containerBotton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingTop: 10,
    },
    touchable: {
        backgroundColor: '#007b4f',
        padding: 5,
        paddingHorizontal: 10,
        borderRadius: 50,
        marginRight: 5,
    },
    textTouchable: {
        color: '#fff',
        textAlign: 'center',
        fontFamily: 'Roboto-Medium',
        fontSize: 14,
    },
});

GameDetail.propTypes = {
    navigation: PropTypes.object.isRequired,
    route: PropTypes.shape({
        params: PropTypes.shape({
            item: PropTypes.shape({
                key: PropTypes.number.isRequired,
                name: PropTypes.string.isRequired,
                image: PropTypes.string.isRequired,
                price: PropTypes.number.isRequired,
                quantity: PropTypes.number.isRequired,
                character: PropTypes.string,
                amiiboSeries: PropTypes.string,
                gameSeries: PropTypes.string,
            }).isRequired,
        }).isRequired,
    }).isRequired,
};

export default GameDetail;
