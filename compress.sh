for folder in */
do
echo $folder
cd $folder

rm *.pdf
rm *.docx
rm *.pages

mkdir compressed
magick mogrify -path compressed/ -strip -interlace Plane -quality 70% -resize 80%   *

rm *.jpg

cd compressed
x=0; for i in *.jpg; do mv "$i" ../$x.jpg; let x=x+1; done
cd ../
rmdir compressed/
cd ../
done
