import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';

export default function App() {
  // Estados para el formulario
  const [cliente, setCliente] = useState('');
  const [producto, setProducto] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [precioUnitario, setPrecioUnitario] = useState('');

  // Estados para la lógica y las historias de usuario
  const [mensaje, setMensaje] = useState('');
  const [esError, setEsError] = useState(false);
  const [contadorPedidos, setContadorPedidos] = useState(0);
  const [ultimoPedido, setUltimoPedido] = useState(null);

  // Función para registrar y validar el pedido (RF-05, RF-06, HU-09)
  const registrarPedido = () => {
    // HU-02: Validación de Cliente
    if (!cliente.trim()) {
      setMensaje('🌸 Debe ingresar el nombre de la clienta');
      setEsError(true);
      return;
    }

    // HU-03: Validación de Producto
    if (!producto.trim()) {
      setMensaje('🌸 Debe ingresar un producto');
      setEsError(true);
      return;
    }

    // HU-04 & HU-06: Validación de Cantidad (entera, positiva, no decimal)
    const cantNum = Number(cantidad);
    if (!cantidad.trim() || isNaN(cantNum) || cantNum <= 0 || !Number.isInteger(cantNum)) {
      setMensaje('🌸 Ingrese una cantidad válida');
      setEsError(true);
      return;
    }

    // HU-09: Validación de Precio Unitario (numérico, mayor a 0)
    const precioNum = Number(precioUnitario);
    if (!precioUnitario.trim() || isNaN(precioNum) || precioNum <= 0) {
      setMensaje('🌸 El precio unitario debe ser un valor numérico válido');
      setEsError(true);
      return;
    }

    // HU-09: Cálculo del valor total (Total = Cantidad × Precio unitario)
    const totalPedido = cantNum * precioNum;

    // Si todo es válido:
    setEsError(false);
    setMensaje('✨ ¡Pedido registrado con éxito! ✨');
    
    // HU-08: Incrementar totalizador de sesión exactamente en 1
    setContadorPedidos(prevContador => prevContador + 1);
    
    // HU-07 & HU-09: Guardar detalles del pedido más reciente
    setUltimoPedido({
      cliente: cliente.trim(),
      producto: producto.trim(),
      cantidad: cantNum,
      precioUnitario: precioNum,
      total: totalPedido,
    });
  };

  // HU-010: Limpiar formulario sin reiniciar el contador
  const limpiarFormulario = () => {
    setCliente('');
    setProducto('');
    setCantidad('');
    setPrecioUnitario('');
    setMensaje('');
    setEsError(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* HU-01: Pantalla principal, nombre de la empresa y mensaje de bienvenida */}
      <Text style={styles.tituloEmpresa}>🌸 Rosé Petal Boutique 🌸</Text>
      <Text style={styles.bienvenida}>✨ ¡Bienvenida a tu sistema de registro de pedidos! ✨</Text>

      <View style={styles.card}>
        {/* HU-02: Nombre del cliente */}
        <Text style={styles.label}>Nombre de la clienta:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. Valentina Gómez"
          placeholderTextColor="#b0bec5"
          value={cliente}
          onChangeText={setCliente}
        />

        {/* HU-03: Producto solicitado */}
        <Text style={styles.label}>Producto solicitado:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. Bouquet de rosas"
          placeholderTextColor="#b0bec5"
          value={producto}
          onChangeText={setProducto}
        />

        {/* HU-04: Cantidad solicitada */}
        <Text style={styles.label}>Cantidad (unidades):</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. 5"
          placeholderTextColor="#b0bec5"
          keyboardType="numeric"
          value={cantidad}
          onChangeText={setCantidad}
        />

        {/* HU-09: Precio unitario */}
        <Text style={styles.label}>Precio unitario ($):</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. 3000"
          placeholderTextColor="#b0bec5"
          keyboardType="numeric"
          value={precioUnitario}
          onChangeText={setPrecioUnitario}
        />

        {/* HU-05: Botón Registrar pedido */}
        <View style={styles.buttonContainer}>
          <Button title="💖 Registrar pedido" onPress={registrarPedido} color="#d81b60" />
        </View>

        {/* HU-010: Botón Limpiar formulario */}
        <View style={styles.buttonContainer}>
          <Button title="🧹 Limpiar formulario" onPress={limpiarFormulario} color="#8e8e93" />
        </View>
      </View>

      {/* HU-06: Mensajes de validación o error */}
      {mensaje !== '' && (
        <Text style={[styles.mensaje, esError ? styles.errorText : styles.exitoText]}>
          {mensaje}
        </Text>
      )}

      {/* HU-07 & HU-09: Confirmación y resumen del pedido más reciente con valor total */}
      {ultimoPedido && !esError && (
        <View style={styles.resumenCard}>
          <Text style={styles.resumenTitulo}>💌 Pedido registrado correctamente:</Text>
          <Text style={styles.resumenTexto}>• Clienta: {ultimoPedido.cliente}</Text>
          <Text style={styles.resumenTexto}>• Producto: {ultimoPedido.producto}</Text>
          <Text style={styles.resumenTexto}>• Cantidad: {ultimoPedido.cantidad}</Text>
          <Text style={styles.resumenTexto}>• Precio Unitario: ${ultimoPedido.precioUnitario.toLocaleString()}</Text>
          <Text style={styles.resumenTotal}>• Valor Total: ${ultimoPedido.total.toLocaleString()}</Text>
        </View>
      )}

      {/* HU-08: Totalizador de pedidos válidos de la sesión */}
      <View style={styles.contadorContainer}>
        <Text style={styles.contadorTexto}>🎀 Pedidos válidos en la sesión: {contadorPedidos}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff0f3',
    padding: 20,
    paddingTop: 50,
  },
  tituloEmpresa: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ad1457',
    textAlign: 'center',
  },
  bienvenida: {
    fontSize: 14,
    fontWeight: '600',
    color: '#c2185b',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 18,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#f8bbd0',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#880e4f',
    marginTop: 12,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#f48fb1',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 45,
    backgroundColor: '#fff8fa',
    color: '#4a154b',
  },
  buttonContainer: {
    marginTop: 15,
    borderRadius: 8,
    overflow: 'hidden',
  },
  mensaje: {
    marginTop: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
  },
  errorText: {
    color: '#c2185b',
  },
  exitoText: {
    color: '#ad1457',
  },
  resumenCard: {
    backgroundColor: '#fce4ec',
    borderColor: '#f48fb1',
    borderWidth: 1,
    borderRadius: 12,
    padding: 15,
    marginTop: 15,
  },
  resumenTitulo: {
    fontWeight: 'bold',
    color: '#880e4f',
    marginBottom: 6,
    fontSize: 15,
  },
  resumenTexto: {
    color: '#6a1b9a',
    fontSize: 14,
    marginBottom: 2,
  },
  resumenTotal: {
    fontWeight: 'bold',
    color: '#ad1457',
    marginTop: 6,
    fontSize: 16,
  },
  contadorContainer: {
    marginTop: 20,
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f8bbd0',
    borderRadius: 10,
  },
  contadorTexto: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#880e4f',
  },
});