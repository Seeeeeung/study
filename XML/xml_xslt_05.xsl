<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="html"/>
	<xsl:template match="/">
		<html>
			<body>
				<h2 style="text-align:center">노드의 다중 조건부 처리</h2>
				<xsl:for-each select="programming_languages/language">
					<xsl:choose>
						<xsl:when test="priority[@rating &gt; 2]">
							<xsl:value-of select="name"/> : 나중에 꼭 공부해요!<br/>
						</xsl:when>

						<xsl:otherwise>
							<xsl:value-of select="name"/> : 우선은 이 과목부터 공부하죠!<br/>
						</xsl:otherwise>
					</xsl:choose>
				</xsl:for-each>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>