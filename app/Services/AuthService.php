<?php

namespace App\Services;

use App\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthService
{
    public function validateCredentials(array $data)
    {
        return Validator::make($data, [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);
    }

    public function attemptLogin(array $credentials)
    {
        return JWTAuth::attempt($credentials);
    }

    public function logout()
    {
        auth()->logout();
    }

    public function validateRegistration(array $data)
    {
        return Validator::make($data, [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);
    }

    public function createUser(array $data)
    {
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);
    }

    public function generateSuccessResponse($data, $message = "")
    {
        return response()->json([
            'data' => $data,
            'message' => $message,
        ], 200);
    }

    public function checkToken()
    {
        try {
            // Intenta obtener el usuario autenticado a partir del token
            $user = JWTAuth::parseToken()->authenticate();
            if (!$user) {
                return response()->json(['error' => 'Token no válido', "success" => false], 401);
            }
            return response()->json(['message' => 'Token válido', 'user' => $user, "success" => true], 200);
        } catch (TokenExpiredException $e) {
            return response()->json(['error' => 'Token expirado', "success" => false], 401);
        } catch (TokenInvalidException $e) {
            return response()->json(['error' => 'Token inválido', "success" => false], 401);
        } catch (JWTException $e) {
            return response()->json(['error' => 'Token no encontrado', "success" => false], 401);
        }
    }
    public function generateErrorResponse($data, $message, $statusCode)
    {
        return response()->json([
            'data' => $data,
            'message' => $message,
            'error' => true,
            'execution_status' => 'Error',
            'class' => 'alert alert-danger'
        ], $statusCode);
    }
}
