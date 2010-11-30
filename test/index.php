<?php

$jquery_versions = array(
	'1.4.4',
	'1.4.3',
	'1.4.2',
	'1.4.1',
	'1.3.2',
	'1.3.1'
);
$jquery = isset($_GET['jquery']) ? $_GET['jquery'] : $jquery_versions[0];

$sexy_versions = array(
	'Sexy.js',
	'Sexy-slim.js',
	'jquery.Sexy.js',
	'jquery.Sexy-slim.js',
	'Sexy.min.js',
	'Sexy-slim.min.js',
	'jquery.Sexy.min.js',
	'jquery.Sexy-slim.min.js'
);
$sexy = isset($_GET['sexy']) ? $_GET['sexy'] : $sexy_versions[0];

$slim = preg_match('/\-slim(\.min)?\.js$/', $sexy) ;

?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8"/>

    <title>Sexy.js &raquo; Tests</title>

    <!-- QUnit -->
    <link rel="stylesheet" href="js/qunit/qunit.css" type="text/css">
    <script src="js/qunit/qunit.js"></script>

		<!-- jQuery -->
    <script src="//ajax.googleapis.com/ajax/libs/jquery/<?php echo $jquery ?>/jquery.js"></script>

		<!-- Sexy -->
    <script src="../dist/<?php echo $sexy ?>"></script>

		<!-- tests -->
		<script src="js/tests/html.js"></script>
		<script src="js/tests/json.js"></script>
		<script src="js/tests/jsonp.js"></script>
		<script src="js/tests/script.js"></script>
		<script src="js/tests/text.js"></script>
		<script src="js/tests/xml.js"></script>
		<?php if (!$slim): ?>
			<script src="js/tests/style.js"></script>
			<script src="js/tests/defer.js"></script>
			<script src="js/tests/sajax.js"></script>
		<?php else: ?>
			<script src="js/tests/defer-slim.js"></script>
			<script src="js/tests/sajax-slim.js"></script>
		<?php endif ?>

  </head>
  <body>

    <h1 id="qunit-header">Sexy.js</h1>
		<div>
			<form method="get">
				<div>
					<label for="jquery"><sup>*</sup>jQuery:</label>
					<select name="jquery">
						<?php foreach ($jquery_versions as $jquery_version): ?>
							<option<?php echo $jquery === $jquery_version ? ' selected' : '' ?>><?php echo $jquery_version ?></option>
						<?php endforeach ?>
					</select>
				</div>
				<div>
					<label for="sexy">Sexy:</label>
					<select name="sexy">
						<?php foreach ($sexy_versions as $sexy_version): ?>
							<option<?php echo $sexy === $sexy_version ? ' selected' : '' ?>><?php echo $sexy_version ?></option>
						<?php endforeach ?>
					</select>
				</div>
				<div>
					<input type="submit" value="Test">
				</div>
			</form>
		</div>
    <h2 id="qunit-banner"></h2>  
    <h2 id="qunit-userAgent"></h2>  
    <ol id="qunit-tests"></ol>  

  </body>
</html>
