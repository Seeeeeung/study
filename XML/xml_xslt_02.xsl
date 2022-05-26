<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="html"/>

	<xsl:template match="/">
		<html>
			<body>
				<h2 style="text-align:center">프로그래밍 언어</h2>
				<xsl:apply-templates/>
			</body>
		</html>
	</xsl:template>

	<xsl:template match="language">
		<p>
			<xsl:apply-templates select="name"/>
			<xsl:apply-templates select="category"/>
		</p>
	</xsl:template>
	
	<xsl:template match="name">
		언어 이름 : <strong>
		<xsl:value-of select="."/></strong><br/>
	</xsl:template>
	
	<xsl:template match="category">
		카테고리 : <span style="color:green">
		<xsl:value-of select="."/></span><br/>
	</xsl:template>
	
</xsl:stylesheet>