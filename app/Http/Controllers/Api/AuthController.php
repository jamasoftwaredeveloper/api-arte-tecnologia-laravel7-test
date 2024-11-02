<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\AuthService;
use Illuminate\Http\Request;


class AuthController extends Controller
{
    protected AuthService $authService;

    public function __construct(AuthService $authService)
    {
        $this->middleware('jwtauth', ['except' => ['login', 'register']]);
        $this->authService = $authService;
    }

    public function login(Request $request)
    {

        $credentials = $request->only(['email', 'password']);

        $validationResult = $this->authService->validateCredentials($credentials);
        if ($validationResult->fails()) {
            return $this->authService->generateErrorResponse($validationResult->errors(), "Los datos ingresados no cumplen con lo requerido", 400);
        }

        $token = $this->authService->attemptLogin($credentials);
        if (!$token) {
            return $this->authService->generateErrorResponse([], 'Algo salió mal, ingresa tus credenciales nuevamente.', 401);
        }

        return $this->authService->generateSuccessResponse([$token, auth()->user()->name], 'Te has autenticado correctamente.');
    }

    public function getUser()
    {
        return $this->authService->generateSuccessResponse(auth()->user(), 'Usuario autenticado correctamente.');
    }

    public function logout()
    {
        $this->authService->logout();
        return $this->authService->generateSuccessResponse(null, 'Se ha cerrado sesión exitosamente.');
    }

    public function checkToken()
    {
        return $this->authService->generateSuccessResponse(auth()->user(), 'Ficha de verificación.');
    }

    protected function register(Request $request)
    {
        $validationResult = $this->authService->validateRegistration($request->all());

        if ($validationResult->fails()) {
            return $this->authService->generateErrorResponse($validationResult->errors(), "Los datos ingresados no cumplen con lo requerido", 400);
        }

        $this->authService->createUser($request->only('name', 'email', 'password'));

        return $this->authService->generateSuccessResponse(null, 'Se ha creado exitosamente el usuario.');
    }
}
