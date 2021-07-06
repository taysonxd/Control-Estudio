<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon as DateTime;
use App\Models\Cohorte;

class CohorteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
		$cohortes = [
				['id' => '1','codigo_cohorte' => '00-01','cohorte' =>'2000-2001', 'created_at' => DateTime::now(),'updated_at' => DateTime::now()],
				['id' => '2','codigo_cohorte' =>'01-02','cohorte' =>'2001-2002', 'created_at' => DateTime::now(),'updated_at' => DateTime::now()],
				['id' => '3','codigo_cohorte' =>'02-03','cohorte' =>'2002-2003', 'created_at' => DateTime::now(),'updated_at' => DateTime::now()],
				['id' => '4','codigo_cohorte' => '03-04','cohorte' =>'2003-2004', 'created_at' => DateTime::now(),'updated_at' => DateTime::now()],
				['id' => '5','codigo_cohorte' => '04-05','cohorte' =>'2004-2005', 'created_at' => DateTime::now(),'updated_at' => DateTime::now()],
				['id' => '6','codigo_cohorte' => '05-06','cohorte' =>'2005-2006', 'created_at' => DateTime::now(),'updated_at' => DateTime::now()],
				['id' => '7','codigo_cohorte' => '06-07','cohorte' =>'2006-2007', 'created_at' => DateTime::now(),'updated_at' => DateTime::now()],
				['id' => '8','codigo_cohorte' => '07-08','cohorte' =>'2007-2008', 'created_at' => DateTime::now(),'updated_at' => DateTime::now()],
				['id' => '9','codigo_cohorte' => '08-09','cohorte' =>'2008-2009', 'created_at' => DateTime::now(),'updated_at' => DateTime::now()],
				['id' => '10','codigo_cohorte' => '09-10','cohorte' =>'2009-2010', 'created_at' => DateTime::now(),'updated_at' => DateTime::now()],
				['id' => '11','codigo_cohorte' => '10-11','cohorte' =>'2010-2011', 'created_at' => DateTime::now(),'updated_at' => DateTime::now()],
				['id' => '12','codigo_cohorte' => '11-12','cohorte' =>'2011-2012', 'created_at' => DateTime::now(),'updated_at' => DateTime::now()],
				['id' => '13','codigo_cohorte' => '12-13','cohorte' =>'2012-2013', 'created_at' => DateTime::now(),'updated_at' => DateTime::now()],
				['id' => '14','codigo_cohorte' => '13-14','cohorte' =>'2013-2014', 'created_at' => DateTime::now(),'updated_at' => DateTime::now()],
				['id' => '15','codigo_cohorte' => '14-15','cohorte' =>'2014-2015', 'created_at' => DateTime::now(),'updated_at' => DateTime::now()],
				['id' => '16','codigo_cohorte' => '15-16','cohorte' =>'2015-2016', 'created_at' => DateTime::now(),'updated_at' => DateTime::now()],
				['id' => '17','codigo_cohorte' => '16-17','cohorte' =>'2016-2017', 'created_at' => DateTime::now(),'updated_at' => DateTime::now()],
				['id' => '18','codigo_cohorte' => '17-18','cohorte' =>'2017-2018', 'created_at' => DateTime::now(),'updated_at' => DateTime::now()],
				['id' => '19','codigo_cohorte' => '18-19','cohorte' =>'2018-2019', 'created_at' => DateTime::now(),'updated_at' => DateTime::now()],
				['id' => '20','codigo_cohorte' => '19-20','cohorte' =>'2019-2020', 'created_at' => DateTime::now(),'updated_at' => DateTime::now()]
		];

    	Cohorte::insert($cohortes);
    }
}
