<?php

use App\CurrencyCode;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CurrencySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('currency_codes')->delete();
        $route =database_path('CurrencyCode.json');
        $json =file_get_contents($route);
        $data = json_decode($json);

        foreach ($data as $obj) {
           CurrencyCode::create(array(
                'name' => $obj->name,
                'value' => $obj->value,
            ));
        }
    }
}
