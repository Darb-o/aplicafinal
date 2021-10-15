<?php
$id_factura=(isset($_POST['id_factura']))?$_POST['id_factura']:'';
$id_produc=(isset($_POST['id_produc']))?$_POST['id_produc']:'';
$nombreP=(isset($_POST['nombreP']))?$_POST['nombreP']:'';
$unidades=(isset($_POST['unidades']))?$_POST['unidades']:'';
$totales=(isset($_POST['totales']))?$_POST['totales']:'';
$valor=(isset($_POST['valor']))?$_POST['valor']:'';
$fecha=(isset($_POST['fecha']))?$_POST['fecha']:'';
$tipo=(isset($_POST['tipo']))?$_POST['tipo']:'';
$usuario=(isset($_POST['usuario']))?$_POST['usuario']:'';

// Cargamos la librería dompdf que hemos instalado en la carpeta dompdf
require_once 'dompdf/autoload.inc.php';
use Dompdf\Dompdf;
// Introducimos HTML de prueba
$html="<p style='text-align:center'>Restaurante</p><p style='text-align:center'>Nit:**********</p><p style='text-align:center;'>Direccion:Cll # A ## Sur</p><p style='text-align:center'>Factura # ".$id_factura."</p><p style='text-align:center'>Fecha: ".$fecha."</p><p style='text-align:center'>Tipo: ".$tipo."</p>";
$usu=explode("/",$usuario);
$id=explode("/",$id_produc);
$nom=explode("/",$nombreP);
$uni=explode("/",$unidades);
$tot=explode("/",$totales);
if($tipo!="Compra en caja"){
	$html.="<p style='text-align:center'>Usuario: ".$usu[0]."</p><p style='text-align:center'>Correo: ".$usu[1]."</p><p style='text-align:center'>Direccion: ".$usu[2]."</p>";
}
$html.="<br><table><tr><th>CODIGO</th><th>NOMBRE</th><th>UNIDADES</th><th>PRECIO</th></tr>";
for ($i = 0; $i<count($id)-1; $i++) {
    $html.="<tr><td style='text-align:right'>".$id[$i]."</td><td style='text-align:right'>".$nom[$i]."</td><td style='text-align:right'>".$uni[$i]."</td><td style='text-align:right'>$".$tot[$i]."</td></tr>";
}

$html.="<tr><td colspan='3' style='text-align:right'>Total:</td><td style='text-align:right'>$".$valor."</td></tr>";

// Instanciamos un objeto de la clase DOMPDF.
$pdf = new DOMPDF();
 
// Definimos el tamaño y orientación del papel que queremos.
$pdf->set_paper("c5", "portrait");
//$pdf->set_paper(array(0,0,104,250));
 
// Cargamos el contenido HTML.
$pdf->load_html(utf8_decode($html));
 
// Renderizamos el documento PDF.
$pdf->render();
 
// Enviamos el fichero PDF al navegador.
$pdf->stream('Factura No '.$id_factura.'.pdf');


/*function file_get_contents_curl($url) {
	$crl = curl_init();
	$timeout = 5;
	curl_setopt($crl, CURLOPT_URL, $url);
	curl_setopt($crl, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($crl, CURLOPT_CONNECTTIMEOUT, $timeout);
	$ret = curl_exec($crl);
	curl_close($crl);
	return $ret;
}*/
?>