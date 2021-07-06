<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon as DateTime;
use Illuminate\Support\Facades\Hash;
use App\User;

class UsuarioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users  = [
        	[
          	'id' => '1',
          	'name' => 'Arcadio Arevalo',
          	'email' => 'aarevalo@uney.edu.ve',
      			'email_verified_at' =>  DateTime::now(),
      			'password' => Hash::make('123456**'),
      			'remember_token' => '',
      			'created_at' => DateTime::now(),
      			'updated_at' => DateTime::now()
       		],
       		[
          	'id' => '2',
          	'name' => 'German Azuaje',
          	'email' => 'gazuaje@uney.edu.ve',
      			'email_verified_at' =>  DateTime::now(),
      			'password' => Hash::make('123456**'),
      			'remember_token' => '',
      			'created_at' => DateTime::now(),
      			'updated_at' => DateTime::now()
       		],
       		[
          	'id' => '3',
          	'name' => 'antonio negrin',
          	'email' => 'antonio@uney.edu.ve',
      			'email_verified_at' =>  DateTime::now(),
      			'password' => Hash::make('12345678'),
      			'remember_token' => '',
      			'created_at' => DateTime::now(),
      			'updated_at' => DateTime::now()
       		]
       	];

   		User::insert($users);
    }
}
