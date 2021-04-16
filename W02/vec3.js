class Vec3
{
  // Constructor
  constructor( x, y, z )
  {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  // Add method
  add( v )
  {

    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
    return this;

  }
  // Hikizan(subtraction) method
  sub( v )
  {

    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z;
    return this;

  }
  // Kakezan(multiplication) method
  mul( v1, v2 )
  {

    this.x = v1.x * v2.x;
    this.y = v1.y * v2.y;
    this.z = v1.z * v2.z;
    return this;

  }
  // nijo(Square) method
  squ( v )
  {
    this.x = v.x * v.x;
    this.y = v.y * v.y;
    this.z = v.z * v.z
    return this;

  }
  // Sum method
  sum()
  {

    return this.x + this.y + this.z;

  }

  // min method
  min()
  {

    var min;

    min = this.x;

    if(min > this.y)
    {min = this.y;}

    if(min > this.z)
    {min = this.z;}

    return min;

  }

  // max method
  max()
  {
    var max;

    max = this.x;

    if(max < this.y)
    {max = this.y;}

    if(max < this.z)
    {max = this.z;}

    return max;

  }

  // mid method
  mid()
  {  var mid;
    if(this.x != this.min && this.x != this.max)
    {mid = this.x;}

    if(this.y != this.min && this.y != this.max)
    {mid = this.y;}

    if(this.z != this.min && this.z != this.max)
    {mid = this.z;}

    return mid;

  }

}
