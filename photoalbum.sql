SELECT
	p.id,
    p.title,
    a.title
FROM
	Photos p
JOIN
	Album_photos ap ON ap.photos = p.id
JOIN
	Album a ON ap.album = a.id