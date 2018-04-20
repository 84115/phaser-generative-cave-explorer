export default class TileScreen
{

    constructor(tile_pixel_count=1, tile_count=1)
    {
        this.tile_pixel_count = tile_pixel_count;
        this.tile_count = tile_count;
    }

    getCentre()
    {
        let divisble = 2;
        let offset = this.getDimension() / divisble;

        return (this.getDimension() * (this.getTilesCount() / divisble)) + offset;
    }

    getDimension()
    {
        return this.tile_pixel_count * this.tile_count;
    }

    getTileSize()
    {
        return this.tile_pixel_count;
    }

    getNByTileSize(n=1)
    {
        return this.tile_pixel_count * n;
    }

    getTilesCount()
    {
        return this.tile_count;
    }

    toTileCoordinate(coordinate)
    {
        return coordinate * this.tile_pixel_count;
    }

    offsetByTiles(coordinate, tiles)
    {
        return coordinate + (this.getTileSize() * tiles);
    }

}
