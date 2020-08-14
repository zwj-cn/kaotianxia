<?php
    header('content-type:text/html;charset=utf8');
    $con=mysqli_connect('localhost','root','root','test');
    $res=mysqli_query($con,"select * from shop");
    $arr=[];
    while($row=mysqli_fetch_assoc($res)){
        $arr[]=$row;
    }
    echo json_encode($arr);
    