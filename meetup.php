<?php
$proxyURL = "https://api.meetup.com/2/open_events.xml?zip=92833&and_text=True&offset=0&format=xml&limited_events=False&text_format=plain&text=women+AND+tech&page=200&time=%2C2w&radius=35.0&key=554071754212291c41435871a39671&desc=False&status=upcoming&sign=true";
$acceptableHeaders = [];
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: ". implode(',',$acceptableHeaders));
$params = '';
foreach($_GET as $key=>$value){
        $value = rawurlencode($value);
        $params.="&$key=$value";
}
$headers = apache_request_headers();
$curl = curl_init();
$headerParams = [];
foreach($headers as $key=>$value){
        if(in_array($key, $acceptableHeaders)){
                $headerParams[] = "$key:$value";
        }
}
curl_setopt_array($curl, array(
  CURLOPT_URL => "$proxyURL?$params",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "GET",
  CURLOPT_HTTPHEADER => $headerParams,
  //REMOVE BELOW LINE ON LIVE SITE
  CURLOPT_SSL_VERIFYPEER => false
));
$response = curl_exec($curl);
$err = curl_error($curl);
echo $err;
echo $response;
?>