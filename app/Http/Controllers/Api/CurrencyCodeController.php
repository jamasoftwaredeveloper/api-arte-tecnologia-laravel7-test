<?php

namespace App\Http\Controllers\Api;

use App\CurrencyCode;
use App\Http\Controllers\Controller;

class CurrencyCodeController extends Controller
{

    public function __construct(){
        $this->middleware('jwtauth');
    }
    /*
    |-------------------------------------------------------------------------------
    | getCurrecyCodes
    |-------------------------------------------------------------------------------
    | URL:            /api/v1/admin
    | Method:         Post
    | Description:    getCurrecyCodes
    */
    public function index()
    {
        $currenciesCode = CurrencyCode::all();
        return response()->json(
            $currenciesCode
        );
    }

}
