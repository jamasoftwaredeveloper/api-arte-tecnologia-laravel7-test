<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::group([
    'namespace' => 'Api',
    'middleware' => 'api',
    'prefix' => 'v1'

], function () {

    /*
    |-------------------------------------------------------------------------------
    | Login
    |-------------------------------------------------------------------------------
    | URL:            /api/v1/cafes/{id}
    | Controller:     Api\AuthController@login
    | Method:         GET
    | Description:    Logueo
    */
    Route::post('/login', 'AuthController@login')->name('login');
    /*
    |-------------------------------------------------------------------------------
    | Register
    |-------------------------------------------------------------------------------
    | URL:            /api/v1/register
    | Controller:     Api\AuthController@register
    | Method:         GET
    | Description:    Regsitro de nuevo usuario
    */
    Route::post('/register', 'AuthController@register')->name('register');
    /*
    |-------------------------------------------------------------------------------
    | logout
    |-------------------------------------------------------------------------------
    | URL:            /api/v1/logout
    | Controller:     Api\AuthController@logout
    | Method:         GET
    | Description:    Cerrar sesión
    */
    Route::post('/logout', 'AuthController@logout');
    // Route::post('refresh', 'AuthController@refresh');
    /*
    |-------------------------------------------------------------------------------
    | getUser
    |-------------------------------------------------------------------------------
    | URL:            /api/v1/getUser
    | Controller:     Api\AuthController@getUser
    | Method:         GET
    | Description:    Usuario autenticado
    */
    Route::post('/getUser', 'AuthController@getUser');
    // Route::post('refresh', 'AuthController@refresh');
    /*
    |-------------------------------------------------------------------------------
    | checkToken
    |-------------------------------------------------------------------------------
    | URL:            /api/v1/checkToke
    | Controller:     Api\AuthController@checkToke
    | Method:         GET
    | Description:    Ficha de verificación.
    */
    Route::post('/checkToken', 'AuthController@checkToken');
    /*
    |-------------------------------------------------------------------------------
    | index
    |-------------------------------------------------------------------------------
    | URL:            /api/v1/index
    | Controller:     Api\AuthController@index
    | Method:         GET
    | Description:    Dashboard.
    */
    Route::post('/admin', 'AdminController@index');
    /*
    |-------------------------------------------------------------------------------
    | getCurrecyCodes
    |-------------------------------------------------------------------------------
    | URL:            /api/v1/getCurrecyCodes
    | Controller:     Api\AuthController@getCurrecyCodes
    | Method:         GET
    | Description:    Retorna todos los codigos de moneda.
    */
    Route::post('/getCurrecyCodes', 'CurrencyCodeController@index');
});
