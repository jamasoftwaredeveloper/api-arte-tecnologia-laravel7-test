<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CurrencyCode extends Model
{
    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = ['created_at','updated_at'];

    public $table = 'currency_codes';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'label','value',
    ];
}
