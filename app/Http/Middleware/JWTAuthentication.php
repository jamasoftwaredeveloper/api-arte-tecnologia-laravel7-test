<?php

namespace App\Http\Middleware;

use Closure;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\TokenBlacklistedException;
class JWTAuthentication
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
        } catch (TokenExpiredException $e) {
            try {
                $newToken = JWTAuth::parseToken()->refresh();
                return response()->json(['error' => true, 'token' => $newToken, 'message' => 'Token expired, new token issued'], 200);
            } catch (TokenBlacklistedException $blacklistException) {
                return response()->json(['success' => false, 'message' => 'Token is invalid'], 200);
            }
        } catch (TokenInvalidException $e) {
            return response()->json(['success' => false, 'message' => 'Token is invalid'], 200);
        } catch (JWTException $e) {
            return response()->json(['success' => false, 'message' => 'Token not found'], 200);
        }
    
        return $next($request);
    }
}
