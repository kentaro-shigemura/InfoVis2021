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
    if(this.x >= this.y)
    {
      if(this.x <= this.z)
      {
        return this.y;
      }else if(this.y <= this.z){
        return this.y;
      }else{
        return this.z;
      }
    }else if(this.y <= this.z){
      return this.x
    }else if(this.x <= this.z){
      return this.x
    }else{
      return this.z;
    }
  }

  // max method
  max()
  {
    if(this.x >= this.y)
    {
      if(this.y >= this.z)
      {
        return this.x;
      }else if(this.z <= this.x){
        return this.x;
      }else{
        return this.z;
      }
    }else if(this.x >= this.z){
      return this.y
    }else if(this.z <= this.y){
      return this.y
    }else{
      return this.z;
    }
  }

  // mid method
  mid()
  {
    if(this.x >= this.y)
    {if(this.y >= this.z)
      {
        return this.y;
      }else if(this.x <= this.z){
        return this.x;
      }else{
        return this.z;
      }
    }else if(this.y <= this.z)//x<y<z
    {
      return this.y;
    }else if(this.z <= this.x){
      return this.x
    }else{
      return this.z;
    }
  }
}
