<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

	//REF: http://www.redbeanphp.com/index.php
	require_once('lib/rb.php');
	R::setup( 'mysql:host=127.0.0.1:3306;dbname=pa-master','pa', 'pressione' );
        
        $error="";
	$table='pressione';
	$record=(empty($_REQUEST['id'])) ?  R::dispense($table) : R::load($table, intval($_REQUEST['id']));	
	try {
		if ($record && !empty($_REQUEST['act']) && $_REQUEST['act']=='del') R::trash($record);
		if (isset($_POST['datamisurazione'])){       
			foreach ($_POST as $k=>$v){
				$record[$k]=$_POST[$k];
			}
                        
                        $sis = $_POST["sistolica"];
                        $dias = $_POST["diastolica"];
                        $date = $_POST["datamisurazione"];
                        $now = date('Y-m-d');
                        
                        if($date>$now) $error = "Non è possibile inserire una data nel futuro";
                        if (!$error) R::store($record);
                        
                        if($dias>=$sis) $error = "Inserire una sistolica maggioe della diastolica!";
			if(!$error) R::store($record);
		}
	} catch (RedBeanPHP\RedException\SQL $e) {
		
	}	
	$pa=R::find($table);
        
        echo json_encode($pa);
