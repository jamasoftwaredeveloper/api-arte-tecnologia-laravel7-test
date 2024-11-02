<?php
namespace App\Services;
use App\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
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

    public function generateSuccessResponse($data, $message)
    {
        return response()->json([
            'data' => $data,
            'message' => $message,
            'error' => false,
            'execution_status' => 'Exitoso',
            'class' => 'alert alert-success'
        ], 200);
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
