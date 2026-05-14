import React, { useEffect, useState, useMemo } from 'react';
import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import CustomSwitch from '../components/CustomSwitch';
import Product from '../components/Product';
import { useDispatch, useSelector } from 'react-redux';
import { editItem, getGames } from '../redux/actions';
import ButtonCustom from '../components/ButtonCustom';
import customStyle from '../commons/CustomStyle';

export default function HomeScreen({ navigation }) {
    const [gamesTab, setGamesTab] = useState(1);
    const { shoppingCart, games, loading, error } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

    const cartItems = useMemo(
        () => shoppingCart.filter(obj => obj.quantity !== 0),
        [shoppingCart]
    );

    useEffect(() => {
        dispatch(getGames());
    }, []);

    const onSelectSwitch = value => {
        setGamesTab(value);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={{ padding: 20 }}>
                <View style={{ marginBottom: 20 }}>
                    <CustomSwitch
                        selectionMode={1}
                        option1="Productos"
                        option2="Carrito"
                        onSelectSwitch={onSelectSwitch}
                    />
                </View>

                {loading && (
                    <View style={styles.centerContainer}>
                        <ActivityIndicator size="large" color={customStyle.PrimaryColor()} />
                        <Text style={styles.loadingText}>Cargando productos...</Text>
                    </View>
                )}

                {error && !loading && (
                    <View style={styles.centerContainer}>
                        <Text style={styles.errorText}>{error}</Text>
                        <ButtonCustom
                            buttonStyle={{ backgroundColor: customStyle.PrimaryColor(), marginTop: 20 }}
                            label={'Reintentar'}
                            labelStyle={{ color: customStyle.White() }}
                            onPress={() => dispatch(getGames())}
                        />
                    </View>
                )}

                {!loading && !error && gamesTab === 1 && games && (
                    <FlatList
                        data={games}
                        keyExtractor={(item) => item.key.toString()}
                        renderItem={({ item }) => (
                            <Product
                                item={item}
                                navigation={navigation}
                                onPress={item => dispatch(editItem(item))}
                            />
                        )}
                        ListEmptyComponent={
                            <View style={styles.centerContainer}>
                                <Text style={styles.emptyText}>No hay productos disponibles</Text>
                            </View>
                        }
                    />
                )}

                {!loading && gamesTab === 2 && (
                    <View>
                        {cartItems.length === 0 && (
                            <View style={styles.shoppingView}>
                                <Text style={styles.shoppingText}>
                                    No has añadido ningun producto al carrito
                                </Text>
                            </View>
                        )}

                        <FlatList
                            data={cartItems}
                            keyExtractor={(item) => item.key.toString()}
                            renderItem={({ item }) => (
                                <Product
                                    item={item}
                                    navigation={navigation}
                                    onPress={(item) => dispatch(editItem(item))}
                                />
                            )}
                        />
                        <ButtonCustom
                            buttonStyle={{ backgroundColor: customStyle.DarkGrey() }}
                            label={'Confirmar compra'}
                            disabled={cartItems.length === 0}
                            labelStyle={{ color: customStyle.White() }}
                            onPress={() => {
                                navigation.navigate('ResumeScreen');
                            }}
                        />
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    viewHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    textHeader: {
        fontSize: 18,
        fontFamily: 'Roboto-Medium',
    },
    imageProfile: {
        width: 35,
        height: 35,
    },
    shoppingText: {
        marginBottom: 25,
    },
    shoppingView: {
        alignItems: 'center',
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 40,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#333',
        fontFamily: 'Roboto-Medium',
    },
    errorText: {
        fontSize: 16,
        color: '#dc3545',
        textAlign: 'center',
        paddingHorizontal: 20,
        fontFamily: 'Roboto-Medium',
    },
    emptyText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        fontFamily: 'Roboto-Medium',
    },
});
